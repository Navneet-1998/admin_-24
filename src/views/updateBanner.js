import React, {useEffect, useState} from 'react'
import { config } from '../index.js';
import { useHistory } from 'react-router-dom';

const UpdateBanner = ({id}) => {
  const history = useHistory();
  const data = {
    heading: '',
    sub_heading: '',
    image: null
  };
  const [banner, setBanner] = useState(data);
  const [bannerId, setBannerId] = useState();


  const handleHeading = (e) => {
    setBanner((prev) => ({ ...prev, heading: e.target.value }));
  };

  const handleSubHeading = (e) => {
    setBanner((prev) => ({ ...prev, sub_heading: e.target.value }));
  };

  const handleImage = (e) => {
    setBanner((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleUpdateData = async () => {
    try {
      const formData = new FormData();
      formData.append('heading', banner.heading);
      formData.append('sub_heading', banner.sub_heading);
      formData.append('image', banner.image);

      const response = await fetch(`${config.endpoint}/banner/edit/${bannerId}`, {
        method: 'PUT',
        body: formData
      });

      if (!response.ok) {
        // Handle HTTP error status
        if (response.status === 400) {
          // Handle client-side validation errors
          const errorData = await response.json();
          console.error('Client-side validation error:', errorData);
        } else {
          // Handle other server-side errors
          throw new Error('Failed to post data');
        }
      } else {
        // Success
        const responseData = await response.json();
        console.log('Data posted successfully:', responseData);
        history.push('/home');
      }
    } catch (error) {
      console.error('Error posting data:', error.message);
    }
  };

  useEffect(() => {
    console.log(id)
    setBannerId(id)
  },[])

  return (
    <>
      <div className='container-fluid'>
        <div className='card'>
          <form className='container-fluid'>
            <h1>Update Your Banner</h1>
            <div className='mb-3'>
              <label htmlFor='heading' className='form-label'>
                Heading
              </label>
              <input
                type='text'
                className='form-control'
                id='heading'
                aria-describedby='headingHelp'
                onChange={handleHeading}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='subHeading' className='form-label'>
                Sub Heading
              </label>
              <input
                type='text'
                className='form-control'
                id='subHeading'
                onChange={handleSubHeading}
              />
            </div>
            <div className='mb-3'>
              <input
                type='file'
                id='avatar'
                name='avatar'
                accept='image/png, image/jpeg, image/jpg'
                onChange={handleImage}
              />
            </div>
            <button type='button' className='btn btn-primary mb-4' onClick={handleUpdateData}>
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateBanner