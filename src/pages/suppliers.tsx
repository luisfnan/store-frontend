import '../App.css'
import MainTable from '../components/MainTable';
import NavBar from '../components/NavBar';




function Suppliers() {
    return (
        <>
            <header>
                <h1>SUPPLIERS</h1>
            </header>

            <NavBar />
            <MainTable url={'suppliers'} />
        </>
    )
}

export default Suppliers