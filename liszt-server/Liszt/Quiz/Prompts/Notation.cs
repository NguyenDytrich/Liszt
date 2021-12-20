namespace Liszt.Quiz.Prompts
{
   public class Notation : Prompt 
   {
     public override string Type { get => "notation"; }

     public string MidiNotation { get; set; }
   }
}
