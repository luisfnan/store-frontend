import '../App.css'
import MainTable from '../components/MainTable';
import NavBar from '../components/NavBar';




function Clients() {

    return (
        <>
            <header>
                <h1>CLIENTS</h1>
            </header>

            <NavBar />
            <MainTable url={'profile'} />
        </>
    )
}

export default Clients