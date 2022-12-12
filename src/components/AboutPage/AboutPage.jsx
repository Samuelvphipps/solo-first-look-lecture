
import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File


// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'


function AboutPage() {
    const [editorData, setEditorData] = useState('');
    let content=useSelector(store=>store.user);
    const dispatch=useDispatch();

    useEffect(()=>{
        dispatch({
            type: 'FETCH_PETS'
        });
    }, []);

    // const editor = useRef();

    // // The sunEditor parameter will be set to the core suneditor instance when this function is called
    // const getSunEditorInstance = (sunEditor) => {
    //     editor.current = sunEditor;
    // };
    //for prop getSunEditorInstance={getSunEditorInstance}

    function handleImageUpload(targetImgElement, index, state, imageInfo, remainingFilesCount){
        console.log(targetImgElement, index, state, imageInfo, remainingFilesCount)
    }

    const handleChange = (content) => {
        setEditorData(content);
    }

    // console.log('editorData:', editorData);

    console.log('content is', content);

    // content = String(content.name);


    return (
        <div>
            <SunEditor 
                onChange={handleChange}
                setOptions={{
				    height: 200,
					buttonList: [
                        ['font', 'align'], 
                        ['image'],
                        ['italic'],
                        ['bold'],
                        ['underline'],
                        ['video'],
                        ['fontSize']                    
                    ]                    
                    // plugins: [font] set plugins, all plugins are set by default
					// Other option
			    }}
                            //variable, will render as a string but not as a variable.
                defaultValue={content}
            />
        </div>
    
    )

}

export default AboutPage;



{/* <h2>CKEDITOR</h2>
            <CKEditor
                    editor={ ClassicEditor }
                    data="<p>Hello from CKEditor 5!</p>"
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={handleChange}
                /> */}