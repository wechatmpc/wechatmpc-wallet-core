# Wechatmpc wallet core

本仓库由本人原构建于Telegram 上的Web3 wallet项目Tonspack改造而来。

旨在构建一个基于Iframe进行去中心化通讯交互的去中心化钱包签名体系。

用于规避Wechat-miniapp的NPM包兼容问题。

# 【Origin Readme】Tonspack wallet font-end Next.js version 

To build better user experience , and reduce the cache issues during the telegram webapp hot update . 

Vallila js version Tonspack wallet will be deprecated .

## Path & Functions 

- Index
    - Display project information . github . document .
- Wallet
    - Auth system
        - Telegram webapp auth
        - Telegram Oauth
        - Telegram BIO auth
    - Wallet system
        - Wallet pack page
            - Wallet list
            - Chain management
            - Chain list & Chain select
        - Wallet action page
            - Token management
            - Token transfer
            - Active history
        - MPC controll
    - Setting system
        - Auth control
            - 2FA control
            - BIO information control
            - Telegram auth control
            - Active history
        - MPC control
            - Email bound
            - Phone bound
            - 2FA bound
    - Action system
        - Connect action
            - Connect to Dapp
            - Chain swith
        - Sign message action
            - Sign messge 
        - Sign and send transaction action
            - Sign and send transaction action in chains support .

## Stack information 

- Next.js 

- NextUI
