document.addEventListener('DOMContentLoaded', function(){
    const form = document.querySelector('.form-group');
    const description = document.getElementById('description');
    const htmlCode = document.getElementById('html-code');
    const cssCode = document.getElementById('css-code');
    const preview = document.getElementById('bg-preview');

    function setLoading(isLoading){
        const button = document.getElementById('generate-btn');

        if(isLoading){
            button.innerText = 'Gerando Background...';
        }
    }

    function bgCreatedSucess(created){
        const button = document.getElementById('generate-btn');

        if(created){
            button.innerText = 'Background gerado com sucesso!';
        }else{
            button.innerText = 'Erro ao gerar background!';
        }
    }

    function applyGeneratePreview(html, css){
        htmlCode.textContent = html;
        cssCode.textContent = css;

        preview.style.display = "block";
        preview.innerHTML = html;

        const existStyle = document.getElementById('dynamic-style');
        if(existStyle){
            existStyle.remove();
        }
        if(css){
            const style = document.createElement('style');
            style.id = "dynamic-style";
            style.textContent = css;
            document.head.appendChild(style);
            bgCreatedSucess(true);
        }
    }

    form.addEventListener('submit', async function(e){
        e.preventDefault();

        const descriptionValue = description.value.trim();
        if(!descriptionValue){
            return;
        }
        setLoading(true);

        try{
            const response = await fetch('https://jadiellsilva.app.n8n.cloud/webhook/4024f10d-63de-4ce0-aa62-b384e3848488', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({descriptionValue})
            });

            const data = await response.json();

            const html = data.html || "Nenhum código HTML retornado.";
            const css = data.css || "Nenhum código CSS retornado.";

            applyGeneratePreview(html, css);

        }catch(error){
            console.error("Erro ao gerar po background:", error);
            htmlCode.textContent = "Erro ao gerar o código HTML.";
            cssCode.textContent = "Erro ao gerar o código CSS.";
            preview.innerHTML = "";
            bgCreatedSucess(false);
        }finally{
            //setLoading(false);
        }

    });
});