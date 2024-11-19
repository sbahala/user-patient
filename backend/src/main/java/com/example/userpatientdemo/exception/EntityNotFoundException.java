package com.example.userpatientdemo.exception;

public class EntityNotFoundException extends EntityException{
    public EntityNotFoundException(String entityName, String message){
        super(entityName, message);
    }
}