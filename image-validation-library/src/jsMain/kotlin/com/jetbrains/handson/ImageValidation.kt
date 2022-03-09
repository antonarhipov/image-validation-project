@file:OptIn(ExperimentalJsExport::class)

package com.jetbrains.handson

import kotlinx.coroutines.MainScope
import kotlinx.coroutines.await
import kotlinx.coroutines.promise
import kotlin.js.Promise

val mainScope = MainScope()

@JsExport
fun isHumanImage(image: ByteArray): Promise<Boolean> = mainScope.promise {
    console.log("Before load")

    val model = load().await()

    console.log("After load")

    val predictions = model.estimateFaces(image, false).await()

    console.log("After estimation")
    console.log("typeof", js("predictions.length"))

    return@promise predictions.isNotEmpty()
}