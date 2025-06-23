function slider() {
  return {
    bilder: [
      'img/sunny-nils.jpg',
      'img/projekt1.jpg',
      'img/projekt2.jpg'
    ],
    aktuellerIndex: 0,
    timer: null,

    startX: 0,
    endX: 0,

    init() {
      this.timer = setInterval(() => {
        this.naechstesBild();
      }, 5000);
    },

    wechseln(index) {
      this.aktuellerIndex = index;
    },

    naechstesBild() {
      this.aktuellerIndex = (this.aktuellerIndex + 1) % this.bilder.length;
    },

    vorherigesBild() {
      this.aktuellerIndex =
        (this.aktuellerIndex - 1 + this.bilder.length) % this.bilder.length;
    },

    dragStart(e) {
      this.startX = e.type.includes("touch") ? e.touches[0].clientX : e.clientX;
    },

    dragEnd(e) {
      this.endX = e.type.includes("touch") ? e.changedTouches[0].clientX : e.clientX;
      const diff = this.endX - this.startX;

      if (Math.abs(diff) > 50) {
        if (diff < 0) {
          this.naechstesBild();
        } else {
          this.vorherigesBild();
        }
      }
    }
  };
}
