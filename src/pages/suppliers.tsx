import '../App.css'
import MainTable from '../components/MainTable';
import NavBar from '../components/NavBar';




function Suppliers() {


    return (
        <>
            <header>
                <h1>CATEGORIES</h1>
            </header>

            <NavBar />
            <MainTable url={'categories'} />

        </>
    )
}

export default Suppliers