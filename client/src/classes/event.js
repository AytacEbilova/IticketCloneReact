class Event {
    constructor(hall, eventDate, vipPrice, standardPrice, goldPrice, silverPrice, title, description) {
        this.hall = hall;
        this.eventDate = eventDate;
        this.vipPrice = vipPrice;
        this.standardPrice = standardPrice;
        this.goldPrice = goldPrice;
        this.silverPrice = silverPrice;
        this.title = title;
        this.description = description;
//
    }

    getSeatPrice(seat) {
        switch (seat.getType()) {
            case 'vip':
                return this.vipPrice;
            case 'gold':
                return this.goldPrice;
            case 'silver':
                return this.silverPrice;
            case 'standard':
            default:
                return this.standardPrice;
        }
    }

    bookSeat(row, col) {
        if (this.hall.isValidSeat(row, col)) {
            const seat = this.hall.seats[row][col];
            if (!seat.isReserved) seat.bookSeat();
        } 
    }

    cancelBooking(row, col) {
        if (this.hall.isValidSeat(row, col)) 
            this.hall.seats[row][col].cancelBooking();
    }

}

export default Event;
