package com.tehnime.backend.utils;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Response <T>{
    private String details;
    private T value;
}