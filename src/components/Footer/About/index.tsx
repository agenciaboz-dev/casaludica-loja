import React from 'react';

interface AboutProps {
    
}

export const About:React.FC<AboutProps> = ({  }) => {
    
    return (
        <div className='About-Component' >
            <div className="container">
                <h1>Casa Lúdica</h1>
                <p>Somos uma loja de brinquedos que ama o que faz, especializada em Brinquedos Educativos, Instrumentos Músicais, Playgrounds e Mobiliários, Materiais Pedagógicos, Jogos e Desafios, Espumados Babys</p>
            </div>
            <div className="container">
                <h1>Escritório comercial</h1>
                <p>Rua 1950, número 720, sala 02 Centro - Balneário Camboriú - SC, 88330-474</p>
            </div>
            <div className="container">
                <h1>Fale com a gente</h1>
                <p>(47) 99168-4299 (47)3081-4937</p>
                <p>falecom@casaludica.com.br</p>
            </div>
        </div>
    )
}