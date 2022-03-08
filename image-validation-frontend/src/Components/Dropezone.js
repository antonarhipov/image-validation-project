/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useMemo} from "react";
import {useDropzone} from 'react-dropzone';
import UserProfilesService from "../Services/UserProfilesService";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

function Dropzone({userProfId}) {

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const baseStyle = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        borderWidth: 2,
        borderRadius: 2,
        borderColor: '#eeeeee',
        borderStyle: 'dashed',
        backgroundColor: '#fafafa',
        color: '#bdbdbd',
        outline: 'none',
        transition: 'border .24s ease-in-out'
    };

    const activeStyle = {
        borderColor: '#7da7c9'
    };

    const acceptStyle = {
        borderColor: '#9dd58e'
    };

    const rejectStyle = {
        borderColor: '#ec5959'
    };

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];

        toast('Wait while we are checking your image...');
        UserProfilesService.isHuman(file).then((result) => {

            if (result) {
                UserProfilesService.uploadImage(file, userProfId).then(res => {

                    console.log("Successful upload");
                    window.location.reload();

                }).catch(err => {
                    console.log(err);
                });
            } else {
                toast('The image must have a human face! ;)');
                console.log("Not a face");
            }

        });


    }, []);
    const {getRootProps, getInputProps, isDragActive, isDragReject, isDragAccept} = useDropzone({accept: 'image/*', onDrop});

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [baseStyle, isDragActive, activeStyle, isDragAccept, acceptStyle, isDragReject, rejectStyle]);

    return (
        <div {...getRootProps({style})}>
            <input {...getInputProps()} />
            {
                isDragActive ?
                    <p>Drop the image here ...</p> :
                    <p>Drag 'n' drop user image, or click to select user image</p>
            }
        </div>
    )
}

export default Dropzone;