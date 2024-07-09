class Seat {
    constructor(row, column, isActive, type, isReserved) {
        this.row = row;
        this.column = column;
        this.isActive = true;
        this.type = type; // 'vip', 'standard', 'silver', 'gold'
        this.isReserved = false;
    }
    bookSeat() {
        if (!this.isReserved)  this.isReserved = true;
    }

    cancelBooking() {
        if (this.isReserved) this.isReserved = false;
    }

}

export default Seat