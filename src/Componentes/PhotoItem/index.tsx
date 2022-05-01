import React from 'react'
import { deletePhoto } from '../../services/photos'
import { Photo } from '../../types/photo'
import * as S from './styles'

type Props = {
    photo: Photo
    key: number
}

const PhotoItem = ({ key, photo }: Props) => {
    return (
        <S.Container key={key}>
            <img src={photo.url} alt={photo.name} />
            <S.ContentButton>
                <S.Deletebutton onClick={() => deletePhoto(photo.name)}>Excluir</S.Deletebutton>
            </S.ContentButton>
        </S.Container>
    )
}

export default PhotoItem