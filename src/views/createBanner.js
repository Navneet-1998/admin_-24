import React, {  useState } from 'react'
import { config } from '../index.js';
import { useHistory } from 'react-router-dom';


function CreateBanner() {

  const history = useHistory();
    const data = {
        heading : "",
        sub_heading:"",
        image: null
    }
    const [banner, setBanner] = useState(data)
    

    const handleHeading= (e) => {
        if (e.target.value) {
            setTimeout(() => {
              console.log(e.target.value)
                setBanner((prev) => ({ ...prev, heading: e.target.value }))
            }, 500);
          }
       }

       const handleSubHeading= (e) => {
        if (e.target.value) {
            setTimeout(() => {
              console.log(e.target.value)

                setBanner((prev) => ({ ...prev, sub_heading: e.target.value }))
            }, 500);
          }
       }
    
       const handleImage = (e) => {
        // Use e.target.files to access the files
        setBanner((prev) => ({ ...prev, image: e.target.files[0] }));
      };
    
      const handleSubmit = async () => {
        try {
          const formData = new FormData();
          formData.append('heading', banner.heading);
          formData.append('sub_heading', banner.sub_heading);
          formData.append('image', banner.image);
    
          const response = await fetch(`${config.endpoint}/banner/create`, {
            method: 'POST',
            body: formData,
          });
    
          if (!response.ok) {
            throw new Error('Failed to post data');
          }
    
          const responseData = await response.json();
          console.log('Data posted successfully:', responseData);
          history.push('/dashboard');
        } catch (error) {
          console.error('Error posting data:', error.message);
        }
      };
    

  return (
    <>
 <div className='container-fluid'>
        <div className="card">
          <form className='container-fluid'>
            <h1>Create a Banner</h1>
            <div className="mb-3">
              <label htmlFor="heading" className="form-label">
                Heading
              </label>
              <input
                type="text"
                className="form-control"
                id="heading"
                aria-describedby="headingHelp"
                onChange={handleHeading}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="subHeading" className="form-label">
                Sub Heading
              </label>
              <input
                type="text"
                className="form-control"
                id="subHeading"
                onChange={handleSubHeading}
              />
            </div>
            <div className="mb-3">
            <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg, image/jpg" onChange={handleImage}/>
            </div>
            <button type="submit" className="btn btn-primary mb-4" onClick={handleSubmit}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default CreateBanner