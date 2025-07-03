import tensorflow as tf
from tensorflow.keras.applications import EfficientNetB3
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D, Dropout
from tensorflow.keras.models import Model
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.callbacks import ModelCheckpoint, EarlyStopping, ReduceLROnPlateau
import numpy as np
import pandas as pd
from sklearn.utils.class_weight import compute_class_weight
import os

# Configuration
IMAGE_SIZE = 300
BATCH_SIZE = 32
EPOCHS = 100
LEARNING_RATE = 0.0001
NUM_CLASSES = 6  # Update this based on your classes
TRAIN_DIR = 'dataset/train'
VAL_DIR = 'dataset/val'

def create_model():
    """Create and compile the model with EfficientNetB3 base"""
    # Base model
    base_model = EfficientNetB3(
        weights='imagenet',
        include_top=False,
        input_shape=(IMAGE_SIZE, IMAGE_SIZE, 3)
    )
    
    # Freeze base model layers initially
    base_model.trainable = False
    
    # Create new model on top
    inputs = tf.keras.Input(shape=(IMAGE_SIZE, IMAGE_SIZE, 3))
    x = tf.keras.applications.efficientnet.preprocess_input(inputs)
    
    # Base model
    x = base_model(x, training=False)
    
    # Add custom layers
    x = GlobalAveragePooling2D()(x)
    x = Dropout(0.3)(x)
    x = Dense(256, activation='relu')(x)
    x = Dropout(0.3)(x)
    outputs = Dense(NUM_CLASSES, activation='softmax')(x)
    
    model = Model(inputs, outputs)
    
    return model, base_model

def create_data_generators():
    """Create train and validation data generators with augmentation"""
    train_datagen = ImageDataGenerator(
        rotation_range=20,
        width_shift_range=0.2,
        height_shift_range=0.2,
        shear_range=0.2,
        zoom_range=0.2,
        horizontal_flip=True,
        fill_mode='nearest',
        preprocessing_function=tf.keras.applications.efficientnet.preprocess_input
    )
    
    val_datagen = ImageDataGenerator(
        preprocessing_function=tf.keras.applications.efficientnet.preprocess_input
    )
    
    train_generator = train_datagen.flow_from_directory(
        TRAIN_DIR,
        target_size=(IMAGE_SIZE, IMAGE_SIZE),
        batch_size=BATCH_SIZE,
        class_mode='categorical',
        shuffle=True
    )
    
    val_generator = val_datagen.flow_from_directory(
        VAL_DIR,
        target_size=(IMAGE_SIZE, IMAGE_SIZE),
        batch_size=BATCH_SIZE,
        class_mode='categorical',
        shuffle=False
    )
    
    return train_generator, val_generator

def compute_class_weights(train_generator):
    """Compute class weights to handle class imbalance"""
    labels = []
    for i in range(len(train_generator)):
        batch = train_generator[i]
        labels.extend(np.argmax(batch[1], axis=1))
        if i == train_generator.n//BATCH_SIZE:
            break
    
    class_weights = compute_class_weight(
        class_weight='balanced',
        classes=np.unique(labels),
        y=labels
    )
    
    return dict(enumerate(class_weights))

def create_callbacks():
    """Create training callbacks"""
    checkpoint = ModelCheckpoint(
        'best_model.h5',
        monitor='val_accuracy',
        save_best_only=True,
        mode='max',
        verbose=1
    )
    
    early_stopping = EarlyStopping(
        monitor='val_accuracy',
        patience=10,
        restore_best_weights=True,
        mode='max',
        verbose=1
    )
    
    reduce_lr = ReduceLROnPlateau(
        monitor='val_loss',
        factor=0.2,
        patience=5,
        min_lr=1e-6,
        mode='min',
        verbose=1
    )
    
    return [checkpoint, early_stopping, reduce_lr]

def train_model():
    """Main training function"""
    # Create model
    model, base_model = create_model()
    
    # Create data generators
    train_generator, val_generator = create_data_generators()
    
    # Compute class weights
    class_weights = compute_class_weights(train_generator)
    
    # Compile model
    model.compile(
        optimizer=Adam(learning_rate=LEARNING_RATE),
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )
    
    # First phase: Train only the top layers
    print("Phase 1: Training top layers...")
    history1 = model.fit(
        train_generator,
        epochs=20,
        validation_data=val_generator,
        class_weight=class_weights,
        callbacks=create_callbacks()
    )
    
    # Second phase: Fine-tune EfficientNetB3 layers
    print("Phase 2: Fine-tuning EfficientNetB3 layers...")
    base_model.trainable = True
    
    # Freeze first 100 layers
    for layer in base_model.layers[:100]:
        layer.trainable = False
    
    # Recompile model
    model.compile(
        optimizer=Adam(learning_rate=LEARNING_RATE/10),
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )
    
    # Continue training
    history2 = model.fit(
        train_generator,
        epochs=EPOCHS,
        validation_data=val_generator,
        class_weight=class_weights,
        callbacks=create_callbacks()
    )
    
    # Save final model
    model.save('final_model.h5')
    
    return history1, history2

if __name__ == "__main__":
    # Create necessary directories
    os.makedirs('dataset/train', exist_ok=True)
    os.makedirs('dataset/val', exist_ok=True)
    
    # Train the model
    history1, history2 = train_model()
    
    # Print final metrics
    print("\nTraining completed!")
    print("Check 'best_model.h5' for the best performing model.") 