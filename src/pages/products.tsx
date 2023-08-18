import '../App.css'
import MainTable from '../components/MainTable';
import NavBar from '../components/NavBar';




function Products() {

    return (
        <>
            <header>
                <h1>PRODUCTS</h1>
            </header>
            <NavBar />
            <MainTable url={'products'} />
        </>
    )
}

export default Products