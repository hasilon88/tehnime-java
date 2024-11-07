package com.tehnime.backend.utils.logger;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LogImpl {
    private static final Logger logger = LoggerFactory.getLogger(LogImpl.class);

    @Pointcut("@annotation(com.tehnime.backend.utils.logger.Log)")
    public void logExecutionAnnotation() {}

    @After("logExecutionAnnotation()")
    public void logging(JoinPoint methodReference) {
        MethodSignature signature = (MethodSignature) methodReference.getSignature();
        Log logAnnotation = signature.getMethod().getAnnotation(Log.class);

        String className = methodReference.getTarget().getClass().getSimpleName();
        String methodName = signature.getMethod().getName();

        String details = logAnnotation.details();
        String level = logAnnotation.level();

        String values = "";

        Object[] params = methodReference.getArgs();
        for (Object param: params) {
            if (param != null)
                values += param;
        }

        String logMessage = "Initiate [" + className + "] " + methodName + "(" + values + ")";

        if (!details.isEmpty())
            logMessage += " - " + details;

        log(logMessage, level);
    }

    public void log(String string, String level) {
        level = level.toLowerCase();
        switch (level) {
            case "info":
                logger.info(string);
                break;
            case "error":
                logger.error(string);
                break;
            case "debug":
                logger.debug(string);
                break;
            case "trace":
                logger.trace(string);
                break;
            case "warn":
                logger.warn(string);
                break;
            default:
                logger.info("Incorrect log level: " + level + ". Logging as INFO: " + string);
                break;
        }
    }
}