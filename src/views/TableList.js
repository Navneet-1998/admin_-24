// import React, {useState,useEffect} from "react";
// import {FiEdit} from "react-icons/fi"
// import {AiOutlineDelete} from "react-icons/ai"
// import { config } from "../index.js"


// // react-bootstrap components
// import {
//   Badge,
//   Button,
//   Card,
//   Navbar,
//   Nav,
//   Table,
//   Container,
//   Row,
//   Col,
// } from "react-bootstrap";

// function TableList() {
//   const [bannerData, getBannerData] = useState([]);
//   const [isClicked, setIsClicked] = useState(false);

//   async function deleteData(id) {
//     try {
//       const response = await fetch(`${config.endpoint}/banner/delete/${id}`, {
//         method: 'DELETE',
//       });
  
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
  
//       const data = await response.json();
//       if (data) {
//         console.log(data);
//       }
//     } catch (error) {
//       console.error("Error deleting data:", error);
//     }
//   }



//   const handleUpdateComponent = (id) => {
//     console.log(id);
//     // UpdateBanner({ id });
//   };
  


//   const handleButtonClick = (id) => {
//     console.log(id)
//     setIsClicked(!isClicked);
//     deleteData(id)
//   };

//   async function fetchData() {
//     console.log(config.endpoint)
//     try {
//       const response = await fetch(`${config.endpoint}/banner/all`);
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       const data = await response.json();
//       if (data) {
//         return data
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   }

//   useEffect(() => {
//     const fetching = async () => {
//       const data = await fetchData();

//       if (data) {
//         console.log(data)
//         getBannerData(data.banners);
//       }
//     };
//     fetching();
//   }, [isClicked]);


//   return (
//     <>
//       <Container fluid>
//         <Row>
//           <Col md="12">
//             <Card className="strpied-tabled-with-hover">
//             <div class="card shadow mb-4">
//               <Card.Header className="d-flex justify-content-between" >
//               <h1 class="h3 mb-2 text-gray-800">Tables</h1>
// <div class="card-header py-3 d-flex justify-content-between">
//         <button className='btn btn-primary' ><a href="create" style={{color: "black", textDecoration:"none"}}>+ Create Banner</a></button>
//     </div>
//               </Card.Header>
// {/* <!-- DataTales Example --> */}



//               <Card.Body className="table-full-width table-responsive px-0">
//                 <Table className="table-hover table-striped">
//                   <thead>
//                     <tr>
//                       <th className="border-0">S_NO</th>
//                       <th className="border-0">Title</th>
//                       <th className="border-0">Sub Title</th>
//                       <th className="border-0">Image</th>
//                       <th className="border-0">Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                    {bannerData.length > 0 ? (bannerData.map((e,index) => (
//                      <tr>
//                      <td>{index+1}</td>
//                      <td>{e.heading}</td>
//                      <td>{e.sub_heading}</td>
//                      <td><img src={e.image} alt="img" style={{width:"80px",height:"80px"}}/></td>
//                      <td><div >
//        <a
//          style={{
//            fontSize: '20px',
//            marginRight: '10px',
//            color: 'initial',
//            cursor: 'pointer'
//          }}
//          href="/edit"
//        >
//          <FiEdit onClick={() => handleUpdateComponent(e._id)}/>
//        </a>
//        <span
//          style={{
//            color: 'red',
//            fontSize: '21px',
//            marginLeft: '10px',
//            cursor: 'pointer'
//          }}
//        >
//          <AiOutlineDelete onClick={() => handleButtonClick(e._id)} />
//        </span>
//      </div></td>
//                    </tr>
//                    ))) : <> </>}
//                   </tbody>
//                 </Table>
//               </Card.Body>
//               </div>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </>
//   );
// }

// export default TableList;





import React, { useState, useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { config } from "../index.js";
import UpdateBanner from "./updateBanner.js";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Tab,
  Tabs,
  Form,
} from "react-bootstrap";

function TableList() {
  const [bannerData, getBannerData] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  async function deleteData(id) {
    try {
      const response = await fetch(`${config.endpoint}/banner/delete/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      if (data) {
        console.log(data);
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  }

  const handleUpdateComponent = (id) => {
    console.log(id);
    UpdateBanner({id});
  };

  const handleButtonClick = (id) => {
    console.log(id);
    setIsClicked(!isClicked);
    deleteData(id);
  };

  async function fetchData() {
    console.log(config.endpoint);
    try {
      const response = await fetch(`${config.endpoint}/banner/all`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (data) {
        return data;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    const fetching = async () => {
      const data = await fetchData();

      if (data) {
        console.log(data);
        getBannerData(data.banners);
      }
    };
    fetching();
  }, [isClicked]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredData = bannerData.filter((banner) =>
    banner.heading.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header className="d-flex justify-content-between">

               <h1 className="h3 mb-2 text-gray-800">Tables</h1>
                  <div className="align-self-center">
                  <Form.Control
                    type="text"
                    placeholder="Search by Title"
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                  </div>
                <div className="d-flex justify-content-between">
                  <button className="btn btn-secondary">
                    <a href="create" style={{ color: "black", textDecoration: "none" }}>
                      + Create Banner
                    </a>
                  </button>
                </div>
              </Card.Header>
              {/* <!-- DataTales Example --> */}
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">S_NO</th>
                      <th className="border-0">Title</th>
                      <th className="border-0">Sub Title</th>
                      <th className="border-0">Image</th>
                      <th className="border-0">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.length > 0 ? (
                      filteredData.map((banner, index) => (
                        <tr key={banner._id}>
                          <td>{index + 1}</td>
                          <td>{banner.heading}</td>
                          <td>{banner.sub_heading}</td>
                          <td>
                            <img src={banner.image} alt="img" style={{ width: "80px", height: "80px" }} />
                          </td>
                          <td>
                            <div>
                              <a
                                style={{
                                  fontSize: "20px",
                                  marginRight: "10px",
                                  color: "initial",
                                  cursor: "pointer",
                                }}
                                href="edit"
                              >
                                <FiEdit onClick={() => handleUpdateComponent(banner._id)} />
                              </a>
                              <span
                                style={{
                                  color: "red",
                                  fontSize: "21px",
                                  marginLeft: "10px",
                                  cursor: "pointer",
                                }}
                              >
                                <AiOutlineDelete onClick={() => handleButtonClick(banner._id)} />
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5">No data found</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default TableList;
