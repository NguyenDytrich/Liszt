using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Google.Cloud.Firestore;

namespace Liszt.Services
{
  public interface IFirestoreDb
  {
    public CollectionReference Collection(string path);
    public Query CollectionGroup(string collectionId);
    public DocumentReference Document(string path);
    public Task<IList<DocumentSnapshot>> GetAllSnapshotsAsync(
        IEnumerable<DocumentReference> documents,
        FieldMask fieldMask,
        CancellationToken cancellationToken = default(CancellationToken));
    public Task<IList<DocumentSnapshot>> GetAllSnapshotsAsync(
        IEnumerable<DocumentReference> documents,
        CancellationToken cancellationToken = default(CancellationToken));
    public IAsyncEnumerable<CollectionReference> ListRootCollectionsAsync();
    public Task RunTransactionAsync(
        Func<Transaction, Task> callback,
        TransactionOptions options = null,
        CancellationToken cancellationToken = default(CancellationToken));
    public Task<T> RunTransactionAsync<T>(
        Func<Transaction, Task<T>> callback,
        TransactionOptions options = null,
        CancellationToken cancellationToken = default(CancellationToken));
    public WriteBatch StartBatch();
    public FirestoreDb WithWarningLogger(Action<string> warningLogger);
  }
}
