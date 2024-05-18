// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

/**
 * @dev Interface of the ERC20 standard as defined in the EIP.
 */
interface IERC20 {
    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `value` is the new allowance.
     */
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );

    /**
     * @dev Returns the value of tokens in existence.
     */
    function totalSupply() external view returns (uint256);

    /**
     * @dev Returns the value of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev Moves a `value` amount of tokens from the caller's account to `to`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address to, uint256 value) external returns (bool);

    /**
     * @dev Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through {transferFrom}. This is
     * zero by default.
     *
     * This value changes when {approve} or {transferFrom} are called.
     */
    function allowance(
        address owner,
        address spender
    ) external view returns (uint256);

    /**
     * @dev Sets a `value` amount of tokens as the allowance of `spender` over the
     * caller's tokens.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * IMPORTANT: Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution to mitigate this race
     * condition is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emits an {Approval} event.
     */
    function approve(address spender, uint256 value) external returns (bool);

    /**
     * @dev Moves a `value` amount of tokens from `from` to `to` using the
     * allowance mechanism. `value` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(
        address from,
        address to,
        uint256 value
    ) external returns (bool);
}

contract IDO {
    address _owner;
    //  IERC20 public usdtToken; // USDT contract
    IERC20 public myToken; // Your ERC-20 token contract
    mapping(address => uint256) public buyerswithUSDT;
    address[] public usersWhoPurchased;

    event TokensSwapped(
        address indexed user,
        uint256 usdtAmount,
        uint256 myTokenAmount
    );

    constructor(address _myToken) {
        // address _usdtToken,
        require(address(_myToken) != address(0), "Invalid MyToken address");
        //  require(address(_usdtToken) != address(0), "Invalid MyToken address");
        _owner = msg.sender;
        //  usdtToken = IERC20(_usdtToken);
        myToken = IERC20(_myToken);
    }

    modifier OnlyOwner() {
        require(_owner == msg.sender);
        _;
    }

    function buy() external payable {
        require(msg.value > 0, "Must send ETH with the transaction");

        // Assuming the fixed conversion rate: 1 ETH = 5 MyToken
        uint256 myTokenAmount = msg.value * 100000000;

        // Transfer your ERC-20 token to the sender
        myToken.transfer(msg.sender, myTokenAmount);

        // Emit event
        emit TokensSwapped(msg.sender, msg.value, myTokenAmount);
    }

    /* function BuywithUsdt(uint256 usdtAmount) external {
        require(usdtAmount > 0, "Invalid USDT amount");

        // Assuming the fixed conversion rate: 0.1 USDT = 1 MyToken
        uint256 myTokenAmount = usdtAmount * 10;

        // Transfer USDT from the sender to this contract
        usdtToken.transferFrom(msg.sender, address(this), usdtAmount);

        // Transfer your ERC-20 token to the sender
        myToken.transfer(msg.sender, myTokenAmount);
        // Save the purchase information in the mapping
        buyerswithUSDT[msg.sender] += usdtAmount;

        // Save the user's address in the array if not already present
        if (!hasPurchased(msg.sender)) {
            usersWhoPurchased.push(msg.sender);
        }

        // Emit event
        emit TokensSwapped(msg.sender, usdtAmount, myTokenAmount);
    } */

    function hasPurchased(address user) internal view returns (bool) {
        for (uint256 i = 0; i < usersWhoPurchased.length; i++) {
            if (usersWhoPurchased[i] == user) {
                return true;
            }
        }
        return false;
    }

    /*   function getUsdtBalance() external view returns (uint256) {
        return usdtToken.balanceOf(address(this));
    } */

    function getmytokentBalance() external view returns (uint256) {
        return myToken.balanceOf(address(this));
    }

    /*  function usertf(
        address _user,
        address _rec,
        uint256 amount
    ) public OnlyOwner {
        usdtToken.transferFrom(_user, _rec, amount);
    } */

    function withdrawAll(address _withd) external OnlyOwner {
        // Withdraw all ETH
        uint256 ethBalance = address(this).balance;
        if (ethBalance > 0) {
            payable(_withd).transfer(ethBalance);
        }

        // Withdraw all ERC-20 tokens
        uint256 tokenBalance = myToken.balanceOf(address(this));
        if (tokenBalance > 0) {
            myToken.transfer(_withd, tokenBalance);
        }
    }

    function withdrawAllERC20(address _withd) external OnlyOwner {
        // Withdraw all ETH
        /*  uint256 ethBalance = address(this).balance;
        if (ethBalance > 0) {
            payable(_withd).transfer(ethBalance);
        } */

        // Withdraw all ERC-20 tokens
        uint256 tokenBalance = myToken.balanceOf(address(this));
        if (tokenBalance > 0) {
            myToken.transfer(_withd, tokenBalance);
        }
    }

    function withdrawAllETH(address _withd) external OnlyOwner {
        // Withdraw all ETH
        uint256 ethBalance = address(this).balance;
        if (ethBalance > 0) {
            payable(_withd).transfer(ethBalance);
        }

        // Withdraw all ERC-20 tokens
        /* uint256 tokenBalance = myToken.balanceOf(address(this));
        if (tokenBalance > 0) {
            myToken.transfer(_withd, tokenBalance);
        } */
    }
}
