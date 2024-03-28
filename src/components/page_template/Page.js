import React, { useState, useEffect } from 'react';
import { useSearch } from '../../contexts/SearchContext';
import '../../styles/Page.css';
import icon_sort from '../../imgs/icon_sort.png';
import icon_filter from '../../imgs/icon_filter.png';
import img_banner from '../../imgs/banner_img.jpg';
import grid_2 from '../../imgs/grid_2.png';
import grid_3 from '../../imgs/grid_3.png';
import grid_4 from '../../imgs/grid_4.png';
import Card from './Card';
import { useLoading } from '../../contexts/LoadingContext';
import LoadingScreen from '../loading/LoadingScreen';
import { GetProducts } from '../../services/ProductsService';
import { FilterProducts } from '../../services/SearchService';

function Page(props) {
  const [productsData, setProductsData] = useState([]);
  const [categoryPage, setCategoryPage] = useState("");
  const [categoriesArray, setCategoriesArray] = useState([]);
  const { searchQuery, setSearchQuery } = useSearch();
  const { inputWorking, setInputWorking } = useSearch();

  const { loading, setLoading } = useLoading();

  //Current width of the screen
  const screenWidth = window.innerWidth;

  //State for the current value of grid (2,3 or 4)
  const [selectedGrid, setSelectedGrid] = useState(4);

  //Arrow Function for the grid states
  const handleGridState = (grid) => {
    setSelectedGrid(grid);
    console.log(selectedGrid);
  }

  const handleCategoriesName = (category) => {
    switch (category) {
      case 'calcados':
        setCategoryPage("Calçados");
        break;
      case 'equipamentos':
        setCategoryPage("Equipamentos");
        break;
      case 'acessorios':
        setCategoryPage("Acessórios");
        break;
      case 'roupas':
        setCategoryPage("Roupas");
        break;
      case 'novidades':
        setCategoryPage("Novidades");
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    const fetchProductsData = async () => {
      if (props.data.name !== 'busca') {
        const { data, message } = await GetProducts();
        if (data) {
          const { products, categories} = data;
          console.log("PROPS: ", props.data.name);
          console.log(data.categories);
          const categoriesArray = Object.values(categories);
          const categoryData = categoriesArray.find(item => item.category === props.data.name);
          let filteredProducts = [];
          console.log("PAGE FILTER: ", categoryData.category);

          handleCategoriesName(categoryData.category);

          if (props.data.name == "novidades") {
            filteredProducts = products.filter(product => product.types.some(type => type.new === true));
          }
          else {
            filteredProducts = products.filter(product => product.category === categoryData.category);
          }

          console.log("PRODUTOS FILTRADOS: ", filteredProducts);
          setProductsData(filteredProducts);
          setLoading(false);
        }
        else {
          console.log("No data found");
          setLoading(false);
        }
      }
      else {
        console.log("BUSCA: ", props.data.name);
        console.log("SEARCH INPUT: ", searchQuery);
        const { data, message } = await FilterProducts(searchQuery)

        if (data) {
          const { products, suggestions } = data
          setProductsData(products);
          console.log("FILTERED DATA: ", products);
          if (products.length !== 0) {
            setCategoryPage(`Encontramos ${products.length} resultado(s) para "${searchQuery}"`);
          }
          else {
            setCategoryPage(`Nenhum resultado encontrado para "${searchQuery}"`);
          }
        }


      }
    };

    fetchProductsData();
  }, [searchQuery]);


  /*****************/
  /*    RENDER 
  /*****************/

  return (

    <div className="products_section">
      <div className="pitchbar_products">
        <div className="swiper_wrapper">
          <div className="banner_img_div">
            <img src={img_banner} alt="banner_img" />
          </div>
          <div className="img_attribution_div">

          </div>

        </div>
      </div>

      <div className="h1_product">
        {props.data.name !== 'busca' ? <h1>{categoryPage}</h1> : <h2>{categoryPage}</h2>}
        <div className="controller_grid">
          <ul>
            <li className="data_grid_2">
              <img src={grid_2} alt="icon_grid2" onClick={() => handleGridState(2)} className="grid_icon" />
            </li>
            <li className="data_grid_3">
              <img src={grid_3} alt="icon_grid3" onClick={() => handleGridState(3)} className="grid_icon" />
            </li>
            <li className="data_grid_4">
              <img src={grid_4} alt="icon_grid4" onClick={() => handleGridState(4)} className="grid_icon" />
            </li>
          </ul>
        </div>
      </div>
      <div className="sort_filter_section">
        <div className="sort_filter_div">
          <button className="filter_button">
            <label>Filtrar</label>
            <img src={icon_filter} alt="filter_icon" />
          </button>
          <button className="sort_button">
            <label>Ordenar</label>
            <img src={icon_sort} alt="sort_icon" />
          </button>
        </div>
      </div>

      <div className="card_container">
        {
          !loading ?
            <div className="cards_products_grid">


              {
                productsData.length !== 0
                  ?
                  <ul id="grid_ul" className={`cardGrid_ul grid_${selectedGrid}`}>
                    {
                      productsData.map((items) => {
                        return (
                          <li key={items._id}>
                            <Card productId={items._id} productName={items.name} productRating={items.rating} productDesc={items.description} productInitPrice={items.initial_price} productType={items.types} />
                          </li>
                        )
                      })
                    }
                  </ul>
                  : (
                    <div className="no_product_div">
                      <h2>Ops! Parece que não há produto relacionado à sua busca.</h2>
                    </div>
                  )
              }

            </div>
            : <LoadingScreen />
        }

      </div>
    </div>

  )
}

export default Page