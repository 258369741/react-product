import React,{useState, useEffect} from 'react'
import {Container, Button, Form, FormGroup, Label, Input, FormText, Row ,Alert} from 'reactstrap';
import axios from "axios";

const EditProductFrom = ({id}) =>{
    const initProduct ={
        id:"",
        name:"",
        category:"",
        price:"",
        tags: [],
    };
    const [product, setProduct] = useState(initProduct);
    const [submitted, setSubmitted] = useState(false);

useEffect(()=>{
    axios.get("https://worathat-product-api.herokuapp.com/products/"+id)
    .then((response)=>{
        setProduct(response.data);
    })
},[id])

    const handleInputChange = (event) =>{
        let {name, value} = event.target;
        if(name === "tags"){
            value=value.split(",");
        }
        setProduct({...product,[name]:value});
    }
    const saveProduct = () =>{
        var data = {
            name : product.name,
            category : product.category,
            price : product.price,
            tags : product.tags
        }
        axios
        .put("https://worathat-product-api.herokuapp.com/products/" +product.id,data)
        .then((response)=>{
            console.log(response.data);
            setProduct({...product, data});
            setSubmitted(true);
        })
        .catch((error) =>{
            console.log(error);
        });
    }
    return (
        <div>
            <Container>
            <Row><h3>Edit Product</h3></Row>
            <Row>
                {submitted ? (
                    <>
                        <Alert color="success">
                            Your product is updateed !!
                        </Alert>
                        <Button color="btn btn-success" onClick={()=>{setSubmitted(false)}}>ok</Button>
                    </>
                ):(<Form>
                    <FormGroup>
                        <Label for="productName">Product Name</Label>
                        <Input 
                            type="text" 
                            name="name" 
                            id="productName" 
                            onChange={handleInputChange}
                            value={product.name || ""}
                            placeholder="ใส่ชื่อผลิตภัณฑ์" 
                        />
                        <Label for="productCategory">Product Category</Label>
                        <Input 
                            type="text" 
                            name="category" 
                            id="productCategory" 
                            onChange={handleInputChange}
                            value={product.category || ""}
                            placeholder="ใส่ชื่อหมวดหมู่ผลิตภัณฑ์" 
                        /> 
                        <Label for="productPrice">Product Price</Label>
                        <Input 
                            type="text" 
                            name="price" 
                            id="productPrice" 
                            onChange={handleInputChange}
                            value={product.price || ""}
                            placeholder="ใส่ราคาผลิตภัณฑ์" 
                        />
                        <Label for="productTags">Product Tags</Label>
                        <Input 
                            type="text" 
                            name="tags" 
                            id="productTags" 
                            onChange={handleInputChange}
                            value={product.tags || ""}
                            placeholder="ใส่ tags ผลิตภัณฑ์" 
                        />
                    </FormGroup>
                    <Button onClick={saveProduct} className="btn btn-success" >Update</Button>
                </Form>
                )}
            
            </Row>
        </Container>
        </div>
    )
}

export default EditProductFrom