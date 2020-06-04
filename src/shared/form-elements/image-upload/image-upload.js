import React, { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Button from '../button'

import './image-upload.css'

const ImageUplaod = ({ id, center, onInput, errorText }) => {
  const filePickerRef = useRef()
  const [file, setFile] = useState()
  const [previewUrl, setPreviewUrl] = useState()
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    if (!file) {
      return
    }
    const fileReader = new FileReader()
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result)
    }
    fileReader.readAsDataURL(file)
  }, [file])

  const pickedHandler = e => {
    let pickedFile = null
    let fileIsValid = isValid
    if (e.target.files && e.target.files.length === 1) {
      pickedFile = e.target.files[0]
      setFile(pickedFile)
      setIsValid(true)
      fileIsValid = true
    } else {
      setIsValid(false)
      fileIsValid = false
    }
    onInput(id, pickedFile, fileIsValid)
  }
  const pickImageHandler = () => {
    filePickerRef.current.click()
  }

  return (
    <div className='form-control'>
      <input
        ref={filePickerRef}
        type="file"
        style={{ display: 'none' }}
        id={id}
        accept=".jpg, .png, .jpeg"
        onChange={pickedHandler}
      />
      <div className={`image-upload ${center && 'center'}`}>
        <div className='image-upload__preview'>
          {previewUrl && <img src={previewUrl} alt="Preview"/>}
          {!previewUrl && <p>Please pick an image</p>}
        </div>
        <Button type="button" onClick={pickImageHandler}>Pick image</Button>
        {!isValid && <p>{errorText}</p>}
      </div>
    </div>
  )
}

ImageUplaod.propTypes = {
  id: PropTypes.string.isRequired,
  center: PropTypes.bool,
  onInput: PropTypes.func.isRequired,
  errorText: PropTypes.string
}

export default ImageUplaod
