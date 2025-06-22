  function slider() {
    return {
      bilder: [
        'img/sunny-nils.jpg',
        'img/projekt1.jpg',
        'img/projekt2.jpg'
      ],
      aktuellerIndex: 0,
      timer: null,
      init() {
        this.timer = setInterval(() => {
          this.aktuellerIndex = (this.aktuellerIndex + 1) % this.bilder.length;
        }, 60000);
      },
      wechseln(index) {
        this.aktuellerIndex = index;
      }
    }
  }