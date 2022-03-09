@file:JsModule("@tensorflow-models/blazeface")
@file:JsNonModule

package com.jetbrains.handson

import kotlin.js.Promise

external fun load(): Promise<BlazeFaceModel>
external class BlazeFaceModel {
    fun estimateFaces(image: ByteArray, b: Boolean): Promise<Array<NormalizedFace>>
}
external interface NormalizedFace