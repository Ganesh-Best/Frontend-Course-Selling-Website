// RichTextEditor.js
import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

function RichTextEditor({setSyallbus}){
  const handleEditorChange = (content, editor) => {
    setSyallbus(content);
    console.log(content);
  };

  return (
    <Editor
      apiKey="tepp6daq47crrbb79z6scuemxj01qw4vxljpm2acdbdlx7ly" // You can get a free API key from TinyMCE or leave it as 'no-api-key' for development
      initialValue="<p>This is the initial content of the editor.</p>"
      init={{
        height: 400,
        width:600,
        menubar: false,
        toolbar: 'bold italic underline strikethrough | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | superscript subscript',
        plugins: 'lists link image',
      }}
      onEditorChange={handleEditorChange}
    />
  );
};

export default RichTextEditor;
