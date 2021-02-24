import React , {useState, useEffect }from 'react';
import axios from "axios";
import { Table , Container , Row, Button} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit , faTrash } from '@fortawesome/free-solid-svg-icons';
import confirm from "reactstrap-confirm";

const ProductList = () => {
    const [products, setProducts] = useState([]);

    const updateProduct = () =>{
        axios.get("https://worathat-product-api.herokuapp.com/products")
        .then((response) => {
            setProducts(response.data.product);
            console.log("Updating.....");
        });
    };

    useEffect(() =>{
        updateProduct();
    }, []);

      const deleteProduct = async (productName,productId) =>{
        let result = await confirm ({
          title: <>Confirmation</>,
          message: "คุณต้องการลบผลิตภัณฑ์" + productName + "ใช่ไหม ?",
          confirmText: "ใช่",
          confirmColor: "primary",
          cancelText:"ไม่",
          cancelColor:"btn btn-danger",
        });
        if(result){
          axios
            .delete("https://worathat-product-api.herokuapp.com/products/"+productId)
            .then( (response) => {
              console.log(response.data);
              updateProduct();
              });
        }
      };


    return (
        <Container>
            <Row>
                <h3> Product List </h3>
            </Row>
            <Table>
            <thead>
        <tr>
          <th>Name</th>
          <th>Caregory</th>
          <th>Price</th>
          <th>Action</th>
        </tr>
      </thead>
        <tbody>
            {products.map((product) => {
          return( 
        <tr key={product.id}>
          <th>{product.name}</th>
          <th>{product.category}</th>
          <th>{product.price}</th>
          <th>
              <Button color="info" href={"/edit/" +product.id}>
                  <FontAwesomeIcon icon={faEdit} />
                Edit</Button>{""}
              <Button color="danger" 
                      onClick={() => deleteProduct(product.name , product.id)}
              >
                   <FontAwesomeIcon icon={faTrash} />Delete
              </Button>
              
              </th>
        </tr>
          );
            })}
        </tbody>
            </Table>
        </Container>
    );
};

export default ProductList