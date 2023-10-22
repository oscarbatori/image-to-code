// import OpenAI from "openai";

// const openai = new OpenAI({ apiKey: "test" })

export const imageToCode = (image: Uint8Array, userPrompt: string) => {
    // This section just returns pre-canned responses because images
    // cannot be sent to ChatGPT API
    if (userPrompt) {
        return secondResponse;
    } else {
        return firstResponse;
    }
}

// This represents how we *should* be calling OpenAI
// const getGenerations = async (image: Uint8Array, userPrompt: string) => {
//     const chatCompletion = await openai.chat.completions.create({
//         messages: [
//             {
//                 role: 'system',
//                 content: systemPrompt,
//             },
//             { 
//                 role: 'user', 
//                 content: getUserPrompt(userPrompt), 
//             },
//             // Stuff for putting the image should go here
//         ],
//         model: 'gpt-3.5-turbo',
//     });
//     return chatCompletion.choices[0].message
// }

// const getUserPrompt = (userPrompt?: string) => {
//     if (userPrompt) {
//         return userPrompt;
//     } else {
//         return `Please examine the following image and translate it into Pulumi code.`;
//     }
// }

const systemPrompt = `Your job is to help users translate images depicting software architecture
into Pulumi code. You should be incredibly precise, as they should be able to run this code.

The user will provide an image file, and you will look at that image file and try your best to
to provide code that is a best attempt at what the user is trying to express`;

// These two responses were created by hand in the ChatGPT UI
const secondResponse = `import pulumi
from pulumi_aws import ec2, cloudwatch, kinesis

# Create two VPCs
vpc1 = ec2.Vpc("teamAVpc", cidr_block="10.0.0.0/16")
vpc2 = ec2.Vpc("teamBVpc", cidr_block="10.0.1.0/16")

# Create EC2 instances in each VPC with a more powerful instance type (e.g., m5.large)
ec2_instance_a = ec2.Instance("teamAInstance",
    instance_type="m5.large",
    ami="ami-0c55b159cbfafe1f0",  # Example Amazon Linux 2 AMI
    vpc_security_group_ids=[vpc1.default_security_group_id],
    subnet_id=vpc1.main_subnet_ids[0])

ec2_instance_b = ec2.Instance("teamBInstance",
    instance_type="m5.large",
    ami="ami-0c55b159cbfafe1f0",  # Example Amazon Linux 2 AMI
    vpc_security_group_ids=[vpc2.default_security_group_id],
    subnet_id=vpc2.main_subnet_ids[0])

# Create VPC flow logs directed to CloudWatch Logs
cloudwatch_log_group = cloudwatch.LogGroup("vpcFlowLogGroup")

flow_log_a = ec2.FlowLog("teamAFlowLog",
    log_group_name=cloudwatch_log_group.name,
    resource_ids=[vpc1.id],
    traffic_type="ALL")

flow_log_b = ec2.FlowLog("teamBFlowLog",
    log_group_name=cloudwatch_log_group.name,
    resource_ids=[vpc2.id],
    traffic_type="ALL")

# Create Kinesis Stream for enriched VPC flow logs
kinesis_stream = kinesis.Stream("enrichedVpcFlowLogs", shard_count=1)
`;

const firstResponse = `import pulumi
from pulumi_aws import ec2, cloudwatch, kinesis

# Create two VPCs
vpc1 = ec2.Vpc("teamAVpc", cidr_block="10.0.0.0/16")
vpc2 = ec2.Vpc("teamBVpc", cidr_block="10.0.1.0/16")

# Create EC2 instances in each VPC
ec2_instance_a = ec2.Instance("teamAInstance",
    instance_type="t2.micro",
    ami="ami-0c55b159cbfafe1f0",  # Example Amazon Linux 2 AMI
    vpc_security_group_ids=[vpc1.default_security_group_id],
    subnet_id=vpc1.main_subnet_ids[0])

ec2_instance_b = ec2.Instance("teamBInstance",
    instance_type="t2.micro",
    ami="ami-0c55b159cbfafe1f0",  # Example Amazon Linux 2 AMI
    vpc_security_group_ids=[vpc2.default_security_group_id],
    subnet_id=vpc2.main_subnet_ids[0])

# Create VPC flow logs directed to CloudWatch Logs
cloudwatch_log_group = cloudwatch.LogGroup("vpcFlowLogGroup")

flow_log_a = ec2.FlowLog("teamAFlowLog",
    log_group_name=cloudwatch_log_group.name,
    resource_ids=[vpc1.id],
    traffic_type="ALL")

flow_log_b = ec2.FlowLog("teamBFlowLog",
    log_group_name=cloudwatch_log_group.name,
    resource_ids=[vpc2.id],
    traffic_type="ALL")

# Create Kinesis Stream for enriched VPC flow logs
kinesis_stream = kinesis.Stream("enrichedVpcFlowLogs", shard_count=1)
`;