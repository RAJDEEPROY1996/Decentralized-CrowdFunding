// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./AggregatorV3Interface.sol";

contract PriceConsumerV3 {
    AggregatorV3Interface internal priceFeed;

    /**
     * Network: BnbTestNet
     * Aggregator: BUSD / ETH
     * Address: 0x5ea7D6A33D3655F661C298ac8086708148883c34
     */
    constructor() {
        priceFeed = AggregatorV3Interface(
            0x5ea7D6A33D3655F661C298ac8086708148883c34
        );
    }

    /**
     * Returns the latest price.
     */
    function getLatestPrice() public view returns (int) {
        // prettier-ignore
        (
            /* uint80 roundID */,
            int price,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = priceFeed.latestRoundData();
        return price;
    }
}
