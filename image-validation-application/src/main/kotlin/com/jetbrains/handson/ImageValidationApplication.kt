package com.jetbrains.handson

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class ImageValidationApplication

fun main(args: Array<String>) {
    runApplication<ImageValidationApplication>(*args)
}
