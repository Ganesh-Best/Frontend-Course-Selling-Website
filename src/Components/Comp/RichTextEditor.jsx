// RichTextEditor.js
import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

function RichTextEditor({setSyallabus,width,syallabus}){
  const handleEditorChange = (content, editor) => {
    setSyallabus(content);
    console.log(content);
  };

  return (
    <Editor
      apiKey="tepp6daq47crrbb79z6scuemxj01qw4vxljpm2acdbdlx7ly" // You can get a free API key from TinyMCE or leave it as 'no-api-key' for development
      initialValue={syallabus}
      init={{
        height: 400,
        width:width,
        menubar: false,
        toolbar: 'bold italic underline strikethrough | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | superscript subscript',
        plugins: 'lists link image',
      }}
      onEditorChange={handleEditorChange}
    />
  );
};

export default RichTextEditor;
