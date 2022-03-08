plugins {
    id("dev.petuska.npm.publish") version "2.1.1"
    kotlin("multiplatform") version "1.6.20-RC"
    id("maven-publish")
}

group = "com.jetbrains.handson"
version = "1.0-SNAPSHOT"

val kotlinDLVersion = "0.3.0"

repositories {
    mavenCentral()
}

repositories {
    mavenCentral()
}

kotlin {
    jvm {
        compilations.all {
            kotlinOptions.jvmTarget = "11"
        }
        withJava()
        testRuns["test"].executionTask.configure {
            useJUnitPlatform()
        }
    }
    js(IR) {
        binaries.library()
        browser()
    }
    sourceSets {
        val commonMain by getting {
            dependencies {
            }
        }
        val commonTest by getting {
            dependencies {
                implementation(kotlin("test"))
            }
        }
        val jvmMain by getting {
            dependencies {
                implementation("org.jetbrains.kotlinx:kotlin-deeplearning-api:$kotlinDLVersion")
                implementation("org.jetbrains.kotlinx:kotlin-deeplearning-onnx:$kotlinDLVersion")
            }
        }
        val jvmTest by getting {
            dependencies {
                implementation("org.jetbrains.kotlinx:kotlinx-coroutines-test:1.6.0")
            }
        }
        val jsMain by getting {
            dependencies {
                implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.6.0")
                implementation("io.ktor:ktor-client-core-js:1.6.7")
                implementation(npm("@tensorflow-models/blazeface", "0.0.7"))
                implementation(npm("@tensorflow/tfjs-core", "3.11.0"))
                implementation(npm("@tensorflow/tfjs-converter", "3.11.0"))
                implementation(npm("@tensorflow/tfjs-backend-webgl", "3.11.0"))
            }
        }
        val jsTest by getting {
            dependencies {
                implementation(kotlin("test-js"))
            }
        }
    }
}

npmPublishing {
    version = "0.0.1"
    repositories {
        repository("npmjs") {
            registry = uri("https://registry.npmjs.org")
            authToken = ""
        }
    }
}