import Seat from "./seat";

class Hall {
  constructor(location,name, contactPhone, email, rows,cols) {
    this.location = location;
    this.Name = name;
    this.contactPhone = contactPhone;
    this.email = email;
    this.rows=rows;
    this.cols=cols;
    this.seats = this.createSeats();
  }
  createSeats() {
    const seats = [];
    for (let row = 0; row < this.rows; row++) {
      const seatRow = [];
      for (let col = 0; col < this.cols; col++) {
        seatRow.push(new Seat(row+1, col+1));
      }
      seats.push(seatRow);
    }
    return seats;
  }

  bookSeat(row, col) {
    if (this.isValidSeat(row, col)) 
      this.seats[row][col].bookSeat();
  }

  cancelBooking(row, col) {
    if (this.isValidSeat(row, col)) 
      this.seats[row][col].cancelBooking();

  }

  setSeatType(row, col, type) {
    if (this.isValidSeat(row, col)) 
      this.seats[row][col].setType(type);
 
  }

  isValidSeat(row, col) {
    return row >= 1 && row <= this.rows && col >= 1 && col <= this.cols;
  }

}

export default Hall;