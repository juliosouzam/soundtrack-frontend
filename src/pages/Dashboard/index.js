import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { uuid } from 'uuidv4';
import filesize from 'filesize';
import { CircularProgressbar } from 'react-circular-progressbar';
import { MdCheckCircle, MdError } from 'react-icons/md';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import {
  Container,
  Content,
  DropContainer,
  UploadMessage,
  FileList,
  FileInfo,
} from './styles';

function Dashboard() {
  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const uploadedFile = useCallback((id, data) => {
    setUploadedFiles((prevState) =>
      prevState.map((file) => (file.id === id ? { ...file, ...data } : file)),
    );
  }, []);

  useEffect(() => {
    files.map((file) => {
      const data = new FormData();

      data.append('file', file.file, file.name);

      api
        .post('/tracks', data, {
          onUploadProgress: (e) => {
            // eslint-disable-next-line radix
            const progress = parseInt(Math.round((e.loaded * 100) / e.total));
            uploadedFile(file.id, {
              progress,
            });
          },
        })
        .then((response) => {
          uploadedFile(uploadedFile.id, {
            uploaded: true,
            id: response.data._id,
            url: response.data.url,
          });
        })
        .catch(() => {
          uploadedFile(uploadedFile.id, {
            error: true,
          });
        });

      return true;
    });
  }, [files, uploadedFile]);

  const onDrop = useCallback((acceptedFiles) => {
    const arrayFiles = acceptedFiles.map((accpeted) => ({
      file: accpeted,
      name: accpeted.name,
      id: uuid(),
      readebleSize: filesize(accpeted.size),
      progress: 0,
      uploaded: false,
      error: null,
    }));

    setFiles(arrayFiles);
    setUploadedFiles(arrayFiles);
  }, []);

  const renderUploadMessage = useCallback((isDragActive, isDragReject) => {
    if (!isDragActive) {
      return <UploadMessage>Arraste arquivos aqui!</UploadMessage>;
    }

    if (isDragReject) {
      return <UploadMessage type="error">Arquivo não suportado!</UploadMessage>;
    }

    return (
      <UploadMessage type="success">Solte os arquivos aqui!</UploadMessage>
    );
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
  } = useDropzone({
    onDrop,
  });

  return (
    <Container>
      <Content>
        <DropContainer
          {...getRootProps()}
          isDragActive={isDragActive}
          isDragReject={isDragReject}
        >
          <input {...getInputProps()} />
          {renderUploadMessage(isDragActive, isDragReject)}
        </DropContainer>

        <FileList>
          {uploadedFiles.map((file) => (
            <li key={file.id}>
              <FileInfo>
                <div>
                  <strong>{file.name}</strong>
                  <span>{file.readebleSize} </span>
                </div>
              </FileInfo>

              <div>
                <CircularProgressbar
                  styles={{
                    root: { width: 24 },
                    path: { stroke: '#7159c1' },
                  }}
                  strokeWidth={10}
                  value={file.progress}
                />

                {file.uploaded && <MdCheckCircle size={24} color="#78e5d5" />}
                {file.error && <MdError size={24} color="#e57878" />}
              </div>
            </li>
          ))}
        </FileList>
      </Content>
      <Link to="/home">Voltar</Link>
    </Container>
  );
}

export default Dashboard;
