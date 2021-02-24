import axios from 'axios';
import React, { useState , useEffect } from 'react'
import { Alert , Container, Row ,Button, Form, FormGroup, Label, Input, FormText,  } from 'reactstrap';

const AddProductFrom = () => {
    const initProduct ={
        name:"",
        category:"",
        price:"",
        tags:[],
    };
    const[product, setProduct] =useState (initProduct);
    const [submitted, setSubmitted] = useState(false);
    const handleInputChange = (event) =>{
        let {name,value} = event.target;
       /*if(name === "tags"){
            value = value.split(",");
        }*/
        setProduct({...product, [name]: value});
    };

    const saveProduct= () => {
        var data = {
            name: product.name,
            category: product.category,
            price: product.price,
            tags: product.tags,
        };
        axios.post("https://worathat-product-api.herokuapp.com/products", data)
        .then((response)=>{
             console.log(response.data); 
            setSubmitted(true);
        }
        )
        .catch((error)=>{
            console.log(error);
        });
    };
    const newProduct = () =>{
        setProduct(initProduct);
        setSubmitted(false);
    };
    return (
      <Container>
          <Row><h3> Add new Product</h3>
          </Row>
          <Row>
                {submitted ? (
                    <><Alert color="success">
                        You have submitted successfully !!    
                    </Alert>

                    <Button color="btn btn-success" onClick={newProduct}>Add more</Button>
                    </>
                ):(
                <Form>
                    <FormGroup>
            <Label for="productName">Product</Label>
            <Input 
            type="text" 
            name="name" 
            id="productName" 
            value={product.name || ""}
            onChange={handleInputChange}
            placeholder="ระบุชื่อผลิตภัณฑ์" 
            />
            <Label for="productCategory">Product Category</Label>
            <Input 
            type="text" 
            name="category" 
            id="productCategory" 
            value={product.category || ""}
            onChange={handleInputChange}
            placeholder="ระบุประเภทของผลิตภัณฑ์" 
            />
            <Label for="productPrice">Product Price</Label>
            <Input 
            type="text" 
            name="price" 
            id="productPrice" 
            value={product.price || ""}
            onChange={handleInputChange}
            placeholder="ระบุราคาผลิตภัณฑ์" 
            />
            <Label for="productTags">Product Tags (ถ้ามีมากกว่า1ให้ใส่ลูกน้ำขั้น ",")</Label>
            <Input 
            type="text" 
            name="tags" 
            id="productTags" 
            value={product.tags || ""}
            onChange={handleInputChange}
            placeholder="ระบุtagsผลิตภัณฑ์" 
            />
                </FormGroup>
                <Button onClick={saveProduct} className="btn btn-success" >Add New Product</Button>
                </Form>
                )}
            </Row>
          </Container>  
    );
};

export default AddProductFrom;