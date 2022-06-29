import React from 'react';
import { NextPage, GetServerSideProps } from 'next';
import { Grid, Box, Typography, Button, Chip } from '@mui/material';
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { ProductSlideshow, SizeSelector } from '../../components/products';
import { ItemCounter } from '../../components/ui';
import { IProduct } from '../../interfaces';
import { dbProducts } from '../../database';

interface Props {
   product: IProduct;
}

export const ProductPage:NextPage<Props> = ({ product }) => {

   return (
      <ShopLayout title={product.title} pageDescription={product.description}>
         <Grid container spacing={3}>
            <Grid item xs={12} sm={7}>
               <ProductSlideshow 
                  images={product.images}
               />
            </Grid>

            <Grid item xs={12} sm={5}>
               <Box display='flex' flexDirection='column'>
                  <Typography variant='h1' component='h1'>
                     {product.title}
                  </Typography>
                  <Typography variant='subtitle1' component='h2'>
                     ${product.price}
                  </Typography>

                  <Box sx={{ my: 2 }}>
                     <Typography variant='subtitle2' sx={{ mb: 1 }}>Cantidad</Typography>
                     <ItemCounter />
                     <Typography variant='subtitle2' sx={{ my: 2 }}>Talle</Typography>
                     <SizeSelector 
                        sizes={product.sizes} 
                     />
                  </Box>

                  {/* Agregar al carrito */}
                  <Button color='secondary' className='circular-btn'>
                     Agregar al carrito
                  </Button>

                  {/* <Chip label='No hay disponibles' color='error' variant='outlined' /> */}

                  {/* Descripcion */}
                  <Box sx={{ mt: 3 }}>
                    <Typography variant='subtitle2'>Descripción</Typography>
                    <Typography variant='body2'>{product.description}</Typography>
                  </Box>

               </Box>
            </Grid>
         </Grid>
      </ShopLayout>
   );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
   
   const { slug = '' } = params as { slug: string };
   const product = await dbProducts.getProductBySlug(slug);

   if(!product) {
      return {
         redirect: {
            destination: '/',
            permanent: false
         }
      }
   }

   return {
      props: {
         product
      }
   }
}

export default ProductPage;

