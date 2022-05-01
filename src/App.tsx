import React, { useState, useEffect } from 'react';
import * as S from './App.styles';
import PhotoItem from './Componentes/PhotoItem';
import * as Photos from './services/photos'
import { Photo } from "./types/photo";

function App() {
  const [loading, setLoading] = useState(false);
  const [upLoading, setUpLoading] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const getPhotos = async () => {
      setLoading(true);
      setPhotos(await Photos.getAll());
      setLoading(false);
    }
    getPhotos()
  }, [])

  const handleFormSubimitted = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const file = formData.get('image') as File;
    if (file && file.size > 0) {
      setUpLoading(true);
      let result = await Photos.upload(file);
      setUpLoading(false);

      if (result instanceof Error) {
        alert(result.message);
      } else {
        let newPhotos = [...photos];
        newPhotos.push(result);
        setPhotos(newPhotos);
      }
    }
  }

  return (
    <S.Container>
      <S.Area>
        <S.Header>Galeria de fotos</S.Header>

        <S.UploadForm method='POST' onSubmit={handleFormSubimitted}>
          <input type="file" alt="" name='image' />
          <input type="submit" value='Enviar' />
          {upLoading ? 'Enviando' : ''}
        </S.UploadForm>

        {loading &&
          <S.ScreenWarning>
            <div className='emoji'>✋</div>
            <div>Carregando...</div>
          </S.ScreenWarning>}

        {!loading && photos.length > 0 &&
          <S.PhotoList>
            {photos.map((photo, index) => (
              <PhotoItem photo={photo} key={index} />
            ))}
          </S.PhotoList>
        }

        {!loading && photos.length === 0 &&
          <S.ScreenWarning>
            <div className='emoji'>😰</div>
            <div>Náo há fotos cadastradas</div>
          </S.ScreenWarning>}



      </S.Area>
    </S.Container>
  );
}

export default App;
