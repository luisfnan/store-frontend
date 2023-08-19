import { useState } from 'react';



export default function AddNew() {
    interface PanelProps {
        children: React.ReactNode;
    }
    const [isActive, setIsActive] = useState(false);
    const Panel: React.FC<PanelProps> = ({ children }) => {

        return (
            <section className="panel">

                {isActive ? (
                    <div className='containerr container-input'>{children}</div>
                ) : (
                    <nav className="flex sm:justify-center space-x-4 edit">
                        <button onClick={() => setIsActive(true)} className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900">Add New</button>
                    </nav>
                )}
            </section>
        );
    }
    return (
        <>

            <Panel>



                <input type='tex' className='input-bx' placeholder='Name' />

                <input type='tex' className='input-bx' placeholder='Address' />

                <input type='tex' className='input-bx' placeholder='Phone Number' />

                <button className='' onClick={() => setIsActive(false)}>click</button>


            </Panel>
        </>
    );
}
