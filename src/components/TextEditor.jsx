import React, { forwardRef, useImperativeHandle } from 'react';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const TextEditor = forwardRef((props, ref) => {
  let editorInstance = null;

  useImperativeHandle(ref, () => ({
    clearEditor: () => {
      if (editorInstance) {
        editorInstance.setData('');
      }
    }
  }));

  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        data=""
        onReady={(editor) => {
          editorInstance = editor;
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          console.log({ event, editor, data });
        }}
        onBlur={(event, editor) => {
          console.log("Blur.", editor);
        }}
        onFocus={(event, editor) => {
          console.log("Focus.", editor);
        }}
      />
    </div>
  );
});

// Set a display name for the TextEditor component
TextEditor.displayName = 'TextEditor';

export default TextEditor;
