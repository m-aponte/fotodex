import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Search from './components/Search';
import ImageCard from './components/ImageCard';
import Welcome from './components/Welcome';
import Spinner from './components/Spinner';
import { Container, Row, Col } from 'react-bootstrap';

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5050';

const notifyLoaded = () => toast.success('Saved images downloaded');
const notifyNewImageFound = (imageTitle) =>
  toast.info(`New image ${imageTitle} was found`);
const notifyImageSaved = (imageTitle) =>
  toast.info(`New image ${imageTitle} was saved`);
const notifyImageDeleted = (imageTitle) =>
  toast.warn(`New image ${imageTitle} was deleted`);
const notifyError = (errorMessage) => toast.error(errorMessage);

const App = () => {
  const [word, setWord] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const getSavedImages = async () => {
    try {
      const res = await axios.get(`${API_URL}/images`);
      setImages(res.data || []);
      setLoading(false);
      notifyLoaded();
    } catch (error) {
      notifyError(error.message);
    }
  };

  useEffect(() => getSavedImages(), []);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get(`${API_URL}/new-image?query=${word}`);
      setImages([{ ...res.data, title: word }, ...images]);
      notifyNewImageFound(word);
    } catch (error) {
      notifyError(error.message);
    }

    setWord('');
  };

  const handleDeleteImage = async (id) => {
    try {
      await axios.delete(`${API_URL}/images/${id}`);
      const imageToDelete = images.find((el) => el.id === id);
      setImages(images.filter((image) => image.id !== id));
      notifyImageDeleted(imageToDelete?.title || 'No images deleted');
    } catch (error) {
      notifyError(error.message);
    }
  };

  const handleSaveImage = async (id) => {
    const imageToBeSaved = images.find((image) => image.id === id);
    imageToBeSaved.saved = true;

    try {
      const res = await axios.post(`${API_URL}/images`, imageToBeSaved);
      if (res.data?.inserted_id) {
        setImages(
          images.map((image) =>
            image.id === id ? { ...image, saved: true } : image
          )
        );
        notifyImageSaved(imageToBeSaved.title);
      }
    } catch (error) {
      notifyError(error.message);
    }
  };

  return (
    <div>
      <Header title="Images Gallery" />
      {!loading ? (
        <>
          <Search
            word={word}
            setWord={setWord}
            handleSubmit={handleSearchSubmit}
          />
          <Container className="mt-4">
            {images.length ? (
              <Row xs={1} md={2} lg={3}>
                {images.map((image, i) => (
                  <Col key={i} className="pb-3">
                    <ImageCard
                      image={image}
                      deleteImage={handleDeleteImage}
                      saveImage={handleSaveImage}
                    />
                  </Col>
                ))}
              </Row>
            ) : (
              <Welcome />
            )}
          </Container>
        </>
      ) : (
        <Spinner />
      )}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default App;
