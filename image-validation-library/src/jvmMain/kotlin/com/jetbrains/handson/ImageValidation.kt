package com.jetbrains.handson

import com.ambatenne.libs.image.validation.prediction.objectDetectionSSD
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import java.io.File
import java.io.FileOutputStream

//actual
suspend fun isHumanImage(image: ByteArray): Boolean =
    withContext(Dispatchers.IO) {
        val tempFile = File.createTempFile("imgTmpFile", null, null)
        val fos = FileOutputStream(tempFile)
        fos.write(image)
        return@withContext objectDetectionSSD(tempFile) == "person"
    }