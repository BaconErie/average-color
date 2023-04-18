const main = () => {
    const imgFile = document.getElementById("imgfile");
    const image = new Image();
    const file = imgFile.files[0];
    const fileReader = new FileReader();
  
    // Whenever file & image is loaded procced to extract the information from the image
    fileReader.onload = () => {
      image.onload = () => {
        // Set the canvas size to be the same as of the uploaded image
        const canvas = document.getElementById("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0);
  
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const array = imageData.data;

        let RED_TOTAL = 0;
        let GREEN_TOTAL = 0;
        let BLUE_TOTAL = 0;

        let RED_COUNT = 0;
        let GREEN_COUNT = 0;
        let BLUE_COUNT = 0;



        const chunkSize = 4;
        for (let i = 0; i < array.length; i += chunkSize) {
            const chunk = array.slice(i, i + chunkSize);
            
            if (chunk[3] != 0) {
                RED_TOTAL += chunk[0];
                RED_COUNT += 1;

                GREEN_TOTAL += chunk[1];
                GREEN_COUNT += 1;

                BLUE_TOTAL += chunk[2];
                BLUE_COUNT += 1;
            }
        }

        let red_avg = Math.round(RED_TOTAL/RED_COUNT);
        let green_avg = Math.round(GREEN_TOTAL/GREEN_COUNT);
        let blue_avg = Math.round(BLUE_TOTAL/BLUE_COUNT);

        console.log(red_avg, green_avg, blue_avg)

        document.getElementById('color-value').innerHTML = `(${red_avg}, ${green_avg}, ${blue_avg})`;
        document.getElementById('color-display').style.backgroundColor = `rgb(${red_avg}, ${green_avg}, ${blue_avg})`;
      };
      image.src = fileReader.result;
    };
    fileReader.readAsDataURL(file);
  };