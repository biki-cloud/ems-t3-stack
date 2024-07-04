```mermaid
flowchart LR

%%外部要素のUser
OU1[User]

%%グループとサービス
subgraph GC[AWS]
  subgraph GV[vpc-sc1]
    subgraph GS1[subnet-1]
      NW1{{"ELB<br>web1"}}
    end
    subgraph GS2[subnet-2]
      CP1("EC2<br>web1")
    end
    DB1[("RDS<br>db1")]
  end
  ST1[("S3<br>xx.com")]
end

%%サービス同士の関係
OU1 --> NW1
NW1 --> CP1
CP1 --> DB1
DB1 -.-> ST1

%%グループのスタイル
classDef SGC fill:none,color:#345,stroke:#345
class GC SGC

classDef SGV fill:none,color:#0a0,stroke:#0a0
class GV SGV

classDef SGPrS fill:#def,color:#07b,stroke:none
class GS2 SGPrS

classDef SGPuS fill:#efe,color:#092,stroke:none
class GS1 SGPuS

%%サービスのスタイル
classDef SOU fill:#aaa,color:#fff,stroke:#fff
class OU1 SOU

classDef SNW fill:#84d,color:#fff,stroke:none
class NW1 SNW

classDef SCP fill:#e83,color:#fff,stroke:none
class CP1 SCP

classDef SDB fill:#46d,color:#fff,stroke:#fff
class DB1 SDB

classDef SST fill:#493,color:#fff,stroke:#fff
class ST1 SST
```