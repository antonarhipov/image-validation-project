@file:OptIn(ExperimentalJsExport::class, DelicateCoroutinesApi::class)

package com.jetbrains.handson

import kotlinx.coroutines.*
import kotlinx.coroutines.Dispatchers

import kotlin.js.Promise

@JsExport
//actual
fun isHumanImage(image: ByteArray): Promise<Boolean> {
    return GlobalScope.promise {
        console.log("Before load")

        val model = load().await()

        console.log("After load")

        val predictions = model.estimateFaces(image, false).await()

        console.log("After estimation")
        console.log("typeof", js("predictions.length"))

        return@promise predictions.isNotEmpty()
    }
}