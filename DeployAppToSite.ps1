Param ([String]$SiteUrl,
       [String]$packageFilePath,
	   [String]$appName,
       [String]$username,
       [String]$password)



#function to add and install app on the site               
function AddInstall-ApptoSite() {
    [CmdletBinding()]
    Param([parameter(Mandatory=$true)][string] $siteUrl,
           [parameter(Mandatory=$true)][string] $packageFilePath,
            [parameter(Mandatory=$true)][string] $appName
    )
         
        try{        
        
		    Write-Output "Adding app in site collection app catalog ...."
            ##Add package file to app catalog        

            $App = Add-PnPApp -Path $packageFilePath -Scope Site -Publish -Overwrite  -ErrorAction Stop 
           
            if($App)
            {
                Write-Output "App successfully added in site collection app catalog "               
                
                $chkAppInstalled = Get-PnPApp -Scope Site | ? {$_.Title -eq $appName} | ? {$_.InstalledVersion -ne $null}
                #checking if app is already installed on site. 
                
                if($chkAppInstalled -eq $null)
                {        
                    #Installing app on the site
                     Install-PnPApp -Identity $App.Id -Scope Site -ErrorAction Stop
                     Write-Output "$appName app successfully installed on the site"    
                             
                }
                else
                {
                    Write-Output "$appName app is already added on the site..updating it.."
                    Update-PnPApp -Identity $App.Id -Scope Site -ErrorAction Stop
                    Write-Output "$appName app successfully updated on the site"
                }
            
              }                
        }
        catch [Exception]
        {           
                    Write-Output $_.Exception.Message -ForegroundColor Yellow                                                                    
        }  
   
}


try{
        Install-Module -Name SharePointPnPPowerShellOnline -Force -Verbose -Scope CurrentUser              
        $encpassword = convertto-securestring -String $password -AsPlainText -Force
        $cred = new-object -typename System.Management.Automation.PSCredential -argumentlist $username, $encpassword
        Write-Output "Connecting to site...."       
        Connect-PnPOnline -Url $SiteUrl  -Credentials $cred -ErrorAction Stop
        Write-Output "Connection created, installing app on site...."		
        AddInstall-ApptoSite -siteUrl $SiteUrl -packageFilePath $packageFilePath -appName $appName           
        Disconnect-PnPOnline   
}
catch{
    Write-Output "Error in Deploying App:  $_.Exception.Message"
}