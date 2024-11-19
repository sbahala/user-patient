package com.example.userpatientdemo.exception;

/**
A base exception class to represent errors related to specific entities
 */
public class EntityException extends RuntimeException{
    private final String entityName;

    public EntityException(String entityName, String message){
        super(message);//pass the message to RuntimeException
        this.entityName = entityName;
    }

    public String getEntityName(){
        return entityName;
    }
}