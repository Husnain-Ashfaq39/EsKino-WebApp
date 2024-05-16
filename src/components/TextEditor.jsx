import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const TextEditor = forwardRef((props, ref) => {
  const editorInstanceRef = useRef(null);

  useImperativeHandle(ref, () => ({
    clearEditor: () => {
      if (editorInstanceRef.current) {
        editorInstanceRef.current.setData('');
      }
    },
    setEditorContent: (content) => {
      if (editorInstanceRef.current) {
        editorInstanceRef.current.setData(content);
      }
    }
  }));

  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        data=""
        onReady={(editor) => {
          editorInstanceRef.current = editor;
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

TextEditor.displayName = 'TextEditor';

export default TextEditor;
