import React, { Component } from "react";
import { connect } from "react-redux";
import Bill from "./bill";
import * as dashboardActions from "../../actions/index";
import SelectBox from "./selectBox";
import ListView from "./listView";
import LineChart from "./lineChart";

class DashboardView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      billColumnHeaders: ["Description", "Category", "Amount", "Date", "", ""],
      bills: [],
      selectedFilterValue: "",
      filterDropdownValues: [],
      monthlyBillList: []
    };
  }

  componentDidMount() {
    this.props.getVendorBills();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      const { vendorBillsData } = nextProps;
      this.setState({
        bills: vendorBillsData,
        filterDropdownValues: vendorBillsData.map(item => item.category)
      });
    }
  }

  editBill = id => {
    const currentBill = this.state.bills.filter(bill => bill.id === id)[0];
    this.refs.desc.value = currentBill.description;
    this.refs.category.value = currentBill.category;
    this.refs.amount.value = currentBill.amount;
    this.refs.date.value = currentBill.date;

    this.setState({
      isEditing: true,
      currentBillId: id
    });
  };

  deleteBill = id => {
    this.setState(
      {
        bills: this.state.bills.filter(bill => bill.id !== id)
      },
      () => {
        this.refs.billForm.reset();
      }
    );
  };

  onFormSubmit = e => {
    e.preventDefault();
    if (this.isPassedValidation()) {
      const billsCopy = [...this.state.bills];
      /// Below assignments of values can be made dynamic later on clarity of proper data structure.
      let description = this.refs.desc.value;
      let category = this.refs.category.value;
      let amount = this.refs.amount.value;
      let date = this.refs.date.value;

      if (this.state.isEditing) {
        const currentBill = this.state.bills.filter(
          bill => bill.id === this.state.currentBillId
        )[0];
        currentBill.description = description;
        currentBill.category = category;
        currentBill.amount = amount;
        currentBill.date = date;
      } else {
        billsCopy.push({ description, category, amount, date });
      }

      this.setState(
        {
          bills: billsCopy,
          isEditing: false
        },
        () => {
          this.refs.billForm.reset();
        }
      );
    } else {
      alert("Please fill all the fields");
    }
  };

  isPassedValidation = () => {
    const formRefs = ["desc", "category", "amount", "date"];
    return formRefs.every(item => this.refs[item].value !== "");
  };

  onFilterApply = e => {
    const value = e.target.value;
    this.setState({
      isFilterApplied: true,
      selectedFilterValue: value,
      filteredBills: this.state.bills.filter(item =>
        item.category.includes(value)
      )
    });
  };

  resetFilters = () => {
    this.setState({
      isFilterApplied: false,
      selectedFilterValue: "",
      filteredBills: []
    });
  };

  calculateMonthlyBills = () => {
    const billsCopy = [...this.state.bills];
    const sortedData = billsCopy.sort(
      (a, b) => Number(a.amount) - Number(b.amount)
    );
    let totalAmount = 0;
    const monthlyBillsArray = [];
    for (let i = 0; i < sortedData.length; i++) {
      totalAmount = totalAmount + Number(sortedData[i].amount);
      if (totalAmount <= 50000) {
        monthlyBillsArray.push(sortedData[i]);
      }
    }
    this.setState({
      monthlyBillList: monthlyBillsArray
    });
  };

  render() {
    const {
      bills,
      billColumnHeaders,
      isEditing,
      filterDropdownValues,
      isFilterApplied,
      filteredBills,
      selectedFilterValue,
      monthlyBillList
    } = this.state;
    const billsData = isFilterApplied ? filteredBills : bills;
    return (
      <div className="dashbaord-view">
        <form ref="billForm" className="bill-addition-form">
          <input type="text" ref="desc" placeholder="Enter description" />
          <input type="text" ref="category" placeholder="Enter category" />
          <input type="text" ref="amount" placeholder="Enter amount" />
          <input type="text" ref="date" placeholder="Enter date" />
          <button onClick={e => this.onFormSubmit(e)}>
            {isEditing ? "Save" : "Add"}
          </button>
        </form>

        <div className="filter-box">
          <label>Filter by Category</label>
          <SelectBox
            filterDropdownValues={filterDropdownValues}
            selectedFilterValue={selectedFilterValue}
            onChange={e => this.onFilterApply(e)}
          />
          <span onClick={this.resetFilters}>Reset Filter</span>
        </div>

        <div className="bill-row bill-header-row">
          {billColumnHeaders.map((header, index) => {
            return <div key={`${header}-${index}`}>{header}</div>;
          })}
        </div>

        <div>
          {billsData.map(item => {
            return (
              <Bill
                data={item}
                onEdit={id => this.editBill(id)}
                onDelete={id => this.deleteBill(id)}
                key={item.id}
              />
            );
          })}
        </div>

        <LineChart data={billsData} />

        <div className="budget-view">
          Monthly budget : 50,0000 <br></br>
          Check Bills to be paid this month:{" "}
          <button onClick={this.calculateMonthlyBills}>Check</button>
          <ListView data={monthlyBillList} />
        </div>
      </div>
    );
  }
}

// Container components can be used too to wrap the presentational components,
// Haven't used it in this project.
const mapStateToProps = state => {
  return {
    vendorBillsData: state.vendorBillsData
  };
};

const mapDispachToProps = dispatch => {
  return {
    getVendorBills: () => dispatch(dashboardActions.getVendorBills())
  };
};
export default connect(
  mapStateToProps,
  mapDispachToProps
)(DashboardView);
