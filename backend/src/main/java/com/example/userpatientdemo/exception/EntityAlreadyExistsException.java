package com.example.userpatientdemo.exception;

public class EntityAlreadyExistsException extends EntityException{
    public EntityAlreadyExistsException(String entityName, String message){
        super(entityName, message);
    }
}

